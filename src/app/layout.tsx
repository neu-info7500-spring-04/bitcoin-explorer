import Head from 'next/head';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
  // Optionally, include other props you might need like title, description etc.
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>NU Bitcoin Explorer</title>
        <meta name="description" content="Northeastern University's Bitcoin Explorer" />
        {/* Add any other head elements here */}
        <link href="/path-to-your-fonts.css" rel="stylesheet" /> {/* If you're using custom fonts */}
      </Head>
      <main>
        {children}
      </main>
      {/* Add your global components like header, footer etc. here if you have them */}
    </>
  );
}
