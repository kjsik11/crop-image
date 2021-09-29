import '@assets/main.css';
import 'nprogress/nprogress.css';

import { useRouter } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

import { CommonLayout } from '@components/layout';

import type { AppProps } from 'next/app';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

const fetcherSWR = (url: string) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', NProgress.start);
    router.events.on('routeChangeComplete', NProgress.done);
    router.events.on('routeChangeError', NProgress.done);

    return () => {
      router.events.off('routeChangeStart', NProgress.start);
      router.events.off('routeChangeComplete', NProgress.done);
      router.events.off('routeChangeError', NProgress.done);
    };
  }, [router]);

  return (
    <>
      <Script src="/js/redirectIE.js" strategy="beforeInteractive" />
      <SWRConfig value={{ fetcher: fetcherSWR }}>
        {/* <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}> */}
        {/* <ManagedUIContext> */}
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
        {/* </ManagedUIContext> */}
      </SWRConfig>
    </>
  );
}
