import { useCallback, useMemo } from "react";
import { AxiosError } from "axios";

import { App, Button, Flex, Typography } from "antd";

export const useReportError = () => {
  const { modal, notification } = App.useApp();
  const { Text } = Typography;

  const showErrorDetails = useCallback(
    async (error: AxiosError) => {
      await modal.info({
        footer: null,
        closable: true,
        icon: null,
        width: 800,
        title: "Ошибка при выполнении запроса",
        content: (
          <Flex vertical gap={5}>
            <Text>Метод:</Text>
            <Text>{error?.config?.method}</Text>
            <Text>Ссылка:</Text>
            <Text>{error?.config?.url}</Text>
            <Text>Параметры запроса:</Text>
            <Text>{error?.config?.data}</Text>
            <Text>Статус ответа:</Text>
            <Text>{error?.status}</Text>
            <Text>Ответ:</Text>
            {/* @ts-expect-error any */}
            <Text>{error?.response?.data?.message}</Text>
          </Flex>
        ),
      });
    },
    [modal, Text]
  );

  const showErrorNotif = useCallback(
    (errorText: string, error: AxiosError) => {
      notification.error({
        message: "Ошибка",
        description: errorText,
        actions: (
          <Flex vertical>
            <Button
              onClick={() => {
                showErrorDetails(error);
                notification.destroy();
              }}
            >
              Подробнее
            </Button>
          </Flex>
        ),
      });
    },
    [notification, showErrorDetails]
  );

  const showSimpleError = useCallback(
    (errorText: string) => {
      notification.error({ message: errorText });
    },
    [notification]
  );

  return useMemo(
    () => ({ showErrorNotif, showErrorDetails, showSimpleError }),
    [showErrorNotif, showErrorDetails, showSimpleError]
  );
};
