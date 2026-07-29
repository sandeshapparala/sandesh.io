'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={urlFor(value)?.url() || ''}
          alt={value.alt || 'Project image'}
          width={800}
          height={600}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        {value.caption && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold my-6 text-black dark:text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold my-5 text-black dark:text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-medium my-4 text-black dark:text-white">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 dark:text-gray-300 my-3 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside my-3 text-gray-700 dark:text-gray-300 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside my-3 text-gray-700 dark:text-gray-300 space-y-1">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href || '#'}
        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: any[] }) {
  return <PortableText value={value} components={portableTextComponents} />;
}
