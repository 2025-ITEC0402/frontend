import { X } from 'lucide-react';

export function ImagePreview({ imageUrl, onRemove }: { imageUrl: string; onRemove: () => void }) {
  return (
    <div className='relative mb-4 flex justify-start'>
      <div className='flex max-w-xs flex-col items-center rounded-xl border border-gray-300 bg-white p-2 shadow-lg dark:border-gray-600 dark:bg-gray-800'>
        <div className='relative flex w-full justify-center'>
          <img
            src={imageUrl}
            alt='Selected'
            className='mx-auto max-h-40 w-auto rounded-lg object-contain'
          />
          <button
            onClick={onRemove}
            className='absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80'
            aria-label='이미지 삭제'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
        <span className='mt-2 text-xs text-gray-500 dark:text-gray-400'>첨부된 이미지</span>
      </div>
    </div>
  );
}
