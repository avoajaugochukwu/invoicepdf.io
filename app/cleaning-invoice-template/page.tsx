import { Metadata } from 'next';
import { TemplateLanding, landingMetadata } from '@/components/invoice/TemplateLanding';
import { getLanding } from '@/lib/invoice/landings';

const landing = getLanding('cleaning-invoice-template')!;
export const metadata: Metadata = landingMetadata(landing);

export default function Page() {
  return <TemplateLanding landing={landing} />;
}
