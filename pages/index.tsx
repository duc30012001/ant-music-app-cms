import Seo from '@/components/seo';
import { AppForm } from '@/components/ui/antdForm';
import AppFormItem from '@/components/ui/antdForm/formItem';
import { defaultConfig } from '@/constants';
import { PASSWORD_LENGTH, PUBLIC_ROUTES } from '@/enums';
import { useActive, useAuth, useLocale, useTranslate } from '@/hooks';
import { AuthLayout } from '@/layouts';
import { Button, Input } from 'antd';
import Link from 'next/link';

type Props = {};

const size = 'large';

function AuthPage({}: Props) {
  const { login } = useAuth();
  const { messages } = useTranslate();
  const { locale } = useLocale();
  const { isActive, active, inActive } = useActive();

  async function onFinish(values: any) {
    active();
    await login({
      ...values,
      language: locale,
    });
    inActive();
  }
  return (
    <>
      <Seo
        data={{
          title: defaultConfig.APP_NAME,
          url: defaultConfig.WEBSITE_URL,
          description: defaultConfig.APP_DESCRIPTION,
          thumbnailUrl: defaultConfig.WEBSITE_URL,
          keyword: defaultConfig.APP_KEYWORDS,
        }}
      />
      <div>
        <p className="m-6 text-center text-2xl font-bold">
          {messages('common.signIn')}
        </p>
        <AppForm layout="vertical" onFinish={onFinish} showSubmit={false}>
          <AppFormItem
            name="email"
            label={messages('common.email')}
            rules={[
              {
                required: true,
                message: messages('validation.input'),
              },
              {
                type: 'email',
              },
            ]}
          >
            <Input size={size} />
          </AppFormItem>
          <AppFormItem
            name="password"
            label={messages('common.password')}
            required
            rules={[
              {
                required: true,
                max: PASSWORD_LENGTH.MAX,
                min: PASSWORD_LENGTH.MIN,
                whitespace: true,
              },
            ]}
          >
            <Input.Password size={size} />
          </AppFormItem>
          <div className="mb-4 flex justify-between">
            <Link href={PUBLIC_ROUTES.HOME} className="text-blue-700">
              {messages('home.label')}
            </Link>
          </div>
          <AppFormItem>
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              size={size}
              loading={isActive}
            >
              {messages('common.signIn')}
            </Button>
          </AppFormItem>
        </AppForm>

        {/* <AppLoader loading={isLoading} /> */}
      </div>
    </>
  );
}

export default AuthPage;

AuthPage.Layout = AuthLayout;
