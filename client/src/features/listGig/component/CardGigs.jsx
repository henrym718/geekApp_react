import { Card } from "antd";
const { Meta } = Card;

export default function CardGigs({ gig }) {
  const { title, url, description } = gig;
  console.log(gig);
  return (
    <Card hoverable cover={<img alt={title} src={url} />}>
      <Meta title={title} description={description} />
    </Card>
  );
}
