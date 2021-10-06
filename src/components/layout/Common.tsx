import { Modal, Notification } from '@src/components/ui';

import { useModal } from '@src/lib/hooks/use-modal';
import { useNoti } from '@src/lib/hooks/use-noti';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  const { modal, closeModal } = useModal();
  const { noti, closeNoti } = useNoti();

  return (
    <div className="relative h-full w-full">
      <main className="relative h-full">{children}</main>

      <Modal {...modal} close={closeModal} />
      <Notification {...noti} close={closeNoti} />
    </div>
  );
}
