// src/app/(main)/page.tsx
import { redirect } from 'next/navigation';

// This page can serve as a dashboard in the future.
// For now, redirecting to the core feature: recommendations.
export default function MainPage() {
  redirect('/recommendations');
  // You could have a dashboard overview here if not redirecting
  // return (
  //   <div>
  //     <h1 className="text-2xl font-semibold">Welcome to Blade Guide</h1>
  //     <p>Select an option from the sidebar to get started.</p>
  //   </div>
  // );
}
