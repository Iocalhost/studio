import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/recommendations');
  return null; // Or a loading spinner, but redirect is usually fast enough
}
