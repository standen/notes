import { NavMenu } from "@/router/constants";

import { Content, Title } from "@/views/ViewMain/components";

export const PageAccounts = () => {
  return (
    <div>
      <Title
        title={NavMenu.PageAccounts.title}
        left={<>left</>}
        right={<>right</>}
      />
      <Content>123</Content>
    </div>
  );
};
