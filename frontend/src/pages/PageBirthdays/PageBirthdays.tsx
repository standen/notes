import { NavMenu } from "@/router/constants";

import { Content, Title } from "@/views/ViewMain/components";

export const PageBirthdays = () => {
  return (
    <div>
      <Title
        title={NavMenu.PageBirthdays.title}
        left={<>left</>}
        right={<>right</>}
      />
      <Content>123</Content>
    </div>
  );
};
