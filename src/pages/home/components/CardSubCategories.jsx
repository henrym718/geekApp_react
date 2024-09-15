import { Card } from "antd";
const { Meta } = Card;

export default function CardSubCategories({ url, title, description }) {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={title} src={url} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
