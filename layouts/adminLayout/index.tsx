import Seo from '@/components/seo';
import { defaultConfig } from '@/constants';
import { useActive } from '@/hooks';
// import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import Content from './content';
import Header from './header';
import { adminRoutes } from './routes';
import Sidebar from './sidebar';

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const { isActive, toggleActive, changeActive } = useActive();
  //   const {
  //     isLoading: isGettingInfo,
  //     isAuthenticated,
  //     role: { isAdmin },
  //   } = useAuth();
  //   const { isLoading: isGettingFeature } = useUserFeature();

  //   const isLoading = isGettingInfo || isGettingFeature;
  //   const { checkPermission, isForbiddenPage } = usePermission();
  //   const { canAccessCurrentRoute, routeCanAccess } = checkPermission();

  const title = useMemo(() => {
    const route = adminRoutes.find((item) => item.href === router.pathname);
    return route?.title ?? defaultConfig.SLOGAN;
  }, [router.pathname]);

  //   useEffect(() => {
  //     function verify() {
  //       if (isLoading) return;

  //       if (!isLoading && !isAuthenticated) {
  //         router.push(ADMIN_ROUTES.AUTH);
  //         return;
  //       }

  //       if (isAdmin && isForbiddenPage) {
  //         return router.push(ADMIN_HOME_ROUTE);
  //       }

  //       if (isAdmin) return;

  //       if (canAccessCurrentRoute) return;

  //       if (routeCanAccess !== undefined) {
  //         return router.push(routeCanAccess.href);
  //       }

  //       if (!isForbiddenPage) {
  //         return router.push(ADMIN_ROUTES.FORBIDDEN);
  //       }
  //     }

  //     verify();
  //   }, [
  //     isLoading,
  //     isAuthenticated,
  //     isAdmin,
  //     isForbiddenPage,
  //     canAccessCurrentRoute,
  //     routeCanAccess,
  //     router,
  //   ]);

  //   const loading =
  //     !isAuthenticated ||
  //     isLoading ||
  //     (!isForbiddenPage && !canAccessCurrentRoute && !isAdmin);
  const loading = false;
  return (
    <>
      <Seo
        data={{
          title: defaultConfig.APP_SHORT_NAME + ' | ' + title,
          url: defaultConfig.WEBSITE_URL,
          description: defaultConfig.APP_DESCRIPTION,
          thumbnailUrl: defaultConfig.WEBSITE_URL,
          keyword: defaultConfig.APP_KEYWORDS,
        }}
      />
      <Layout>
        <Header collapsed={isActive} toggleCollapsed={toggleActive} />
        <Layout>
          <Sidebar
            collapsed={isActive}
            onBreakpoint={changeActive}
            trigger={null}
          />
          <Layout>
            <div className="h-[calc(100vh-4rem)]">
              <Content>{children}</Content>
              {/* <AppLoader className="bg-white" loading={loading} /> */}
            </div>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
