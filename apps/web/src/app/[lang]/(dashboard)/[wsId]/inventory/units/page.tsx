import { DataTable } from '@/components/ui/custom/tables/data-table';
import { basicColumns } from '@/data/columns/basic';
import { verifyHasSecrets } from '@/lib/workspace-helper';
import { ProductUnit } from '@/types/primitives/ProductUnit';
import { createClient } from '@/utils/supabase/server';

interface Props {
  params: {
    wsId: string;
  };
  searchParams: {
    q: string;
    page: string;
    pageSize: string;
  };
}

export default async function WorkspaceUnitsPage({
  params: { wsId },
  searchParams,
}: Props) {
  await verifyHasSecrets(wsId, ['ENABLE_INVENTORY'], `/${wsId}`);
  const { data, count } = await getData(wsId, searchParams);

  return (
    <DataTable
      data={data}
      columnGenerator={basicColumns}
      namespace="basic-data-table"
      count={count}
      defaultVisibility={{
        id: false,
        created_at: false,
      }}
    />
  );
}

async function getData(
  wsId: string,
  {
    q,
    page = '1',
    pageSize = '10',
  }: { q?: string; page?: string; pageSize?: string }
) {
  const supabase = createClient();

  const queryBuilder = supabase
    .from('inventory_units')
    .select('*', {
      count: 'exact',
    })
    .eq('ws_id', wsId);

  if (q) queryBuilder.ilike('name', `%${q}%`);

  if (page && pageSize) {
    const parsedPage = parseInt(page);
    const parsedSize = parseInt(pageSize);
    const start = (parsedPage - 1) * parsedSize;
    const end = parsedPage * parsedSize;
    queryBuilder.range(start, end).limit(parsedSize);
  }

  const { data, error, count } = await queryBuilder;
  if (error) throw error;

  return { data, count } as { data: ProductUnit[]; count: number };
}
