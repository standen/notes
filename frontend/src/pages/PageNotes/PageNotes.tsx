import { NavMenu } from "@/router/constants";

import { Content, Title } from "@/views/ViewMain/components";

export const PageNotes = () => {
  return (
    <div>
      <Title
        title={NavMenu.PageNotes.title}
        left={<>left</>}
        right={<>right</>}
      />
      <Content>123</Content>
    </div>
  );
};
