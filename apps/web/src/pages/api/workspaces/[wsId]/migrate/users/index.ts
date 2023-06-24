import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { WorkspaceUser } from '../../../../../../types/primitives/WorkspaceUser';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { wsId } = req.query;

    if (!wsId || typeof wsId !== 'string') throw new Error('Invalid wsId');

    switch (req.method) {
      case 'POST':
        if (!wsId || typeof wsId !== 'string') throw new Error('Invalid wsId');
        return await createWorkspaceUser(req, res, wsId);

      default:
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        message: 'Something went wrong',
      },
    });
  }
};

const createWorkspaceUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  wsId: string
) => {
  const supabase = createPagesServerClient({
    req,
    res,
  });

  const { users } = req.body as { users: WorkspaceUser[] };

  // Upsert users
  const { error: upsertError } = await supabase.from('workspace_users').upsert(
    users.map((user) => ({
      ...user,
      ws_id: wsId,
    }))
  );

  // Delete users that are not in the list
  const { error: deleteError } = await supabase
    .from('workspace_users')
    .delete()
    .match({ ws_id: wsId, id: { notIn: users.map((user) => user.id) } });

  if (upsertError || deleteError) {
    console.error(upsertError, deleteError);

    return res.status(500).json({
      error: {
        message: 'Something went wrong',
      },
    });
  }

  return res.status(200).json({});
};

export default handler;
