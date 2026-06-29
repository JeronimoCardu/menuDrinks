import { getAdminProducts } from '../actions';
import PrintPreviewContent from '@/components/admin/PrintPreviewContent';

export const dynamic = 'force-dynamic';

export default async function PrintPreviewPage() {
  const products = await getAdminProducts();
  return <PrintPreviewContent products={products} />;
}
