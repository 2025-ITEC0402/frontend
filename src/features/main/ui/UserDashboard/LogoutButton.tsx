'use client';

import { Button } from '@/src/shared/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'accessToken=; path=/; max-age=0;';
    toast.success('성공적으로 로그아웃 되었습니다.');
    router.replace('/');
  };

  return (
    <Button onClick={handleLogout} variant='outline' size='sm' className='gap-1 hover:opacity-80'>
      <LogOut className='h-4 w-4' />
      로그아웃
    </Button>
  );
}
