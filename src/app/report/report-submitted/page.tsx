"use client";

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const ReportSubmittedConfirmationPage = () => {
    const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold mb-6 text-center"> Your Report has been Submitted!</h1>
      <Button onClick={() => router.push('/report')}> Submit another report</Button>
    </div>
  )
}

export default ReportSubmittedConfirmationPage
