import { X } from 'lucide-react';

interface ImagePreviewProps {
  image: string;
  onRemove: () => void;
}

export function ImagePreview({ image, onRemove }: ImagePreviewProps) {
  return (
    <div className='relative mb-4 flex justify-start'>
      <div className='flex max-w-xs flex-col items-center rounded-xl border bg-white p-2 shadow-lg dark:bg-gray-800'>
        <div className='relative flex w-full justify-center'>
          <img
            src={image}
            alt='Selected'
            className='mx-auto max-h-40 w-auto rounded-lg object-contain'
          />
          <button
            onClick={onRemove}
            className='absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80'
            aria-label='이미지 삭제'
            style={{ zIndex: 10 }}
          >
            <X className='h-4 w-4' />
          </button>
        </div>
        <span className='mt-2 text-xs text-gray-500 dark:text-gray-400'>첨부된 이미지</span>
      </div>
    </div>
  );
}
