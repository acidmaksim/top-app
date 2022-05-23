import { useEffect, useState } from "react";
import { Button, Ptag, Rating, Tag } from "../components";
import { Htag } from "../components/Htag/Htag";

export default function Home():JSX.Element {

 const [rating, setRating] = useState<number>(4);

  return (
    <>
    {/* <Htag tag='h1'>{counter}</Htag> */}
    <Button appearance='primary' className="dw" onClick={() => setCounter(x => x + 1)}>Button</Button>
    <Button appearance='primary' arrow='right'>Arrow</Button>
    <Button appearance='ghost' arrow='right'>Button</Button>
    <Ptag size="s">Small</Ptag>
    <Ptag >Medium</Ptag>
    <Ptag size="l">Large</Ptag>
    <Tag >Small</Tag>
    <Tag  color="red">Medium</Tag>
    <Tag  color='primary'>Small</Tag>
    <Tag  color='green'>Small</Tag>
    <Tag  color='ghost'>Small</Tag>
    <Tag size="m" color='ghost'>Small</Tag>
    <Rating rating={rating}  isEditable setRating={setRating} />
    </>
  );
}
