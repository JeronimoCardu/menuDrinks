import { getAdminProducts } from './actions';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const products = await getAdminProducts();
  return <AdminShell initialProducts={products} />;
}
