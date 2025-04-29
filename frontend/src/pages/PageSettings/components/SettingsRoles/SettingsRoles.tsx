import { TableRoles } from "./table/TableRoles";

import { Flex, Button } from "antd";
import { Card } from "@/ui";

import { useRoles } from "./hooks/useRoles";

export const SettingsRoles = () => {
  const { createRole } = useRoles();
  return (
    <Flex gap={10} vertical>
      <Card>
        <Flex justify="space-between">
          <div>search</div>
          <div>
            <Button onClick={createRole}>Добавить</Button>
          </div>
        </Flex>
      </Card>
      <Card>
        <TableRoles />
      </Card>
    </Flex>
  );
};
