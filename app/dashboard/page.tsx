import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';
import React from 'react'

async function DashboardPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  if (!params.link) redirect('/login');

  const embededLink = decodeURIComponent(params.link as string);

  return (
    <div className="w-full h-screen">
      <iframe
        style={{ border: 0, height: '100%', width: '100%' }}
        src={embededLink}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default DashboardPage