import { FC } from 'react';

interface Props {
  value: number;
}

export const DiceFace: FC<Props> = ({ value }) => {
  const dotPositions: Record<number, Array<[number, number]>> = {
    1: [[0, 0]],
    2: [
      [-0.3, -0.3],
      [0.3, 0.3],
    ],
    3: [
      [-0.3, -0.3],
      [0, 0],
      [0.3, 0.3],
    ],
    4: [
      [-0.3, -0.3],
      [-0.3, 0.3],
      [0.3, -0.3],
      [0.3, 0.3],
    ],
    5: [
      [-0.3, -0.3],
      [-0.3, 0.3],
      [0, 0],
      [0.3, -0.3],
      [0.3, 0.3],
    ],
    6: [
      [-0.3, -0.3],
      [-0.3, 0],
      [-0.3, 0.3],
      [0.3, -0.3],
      [0.3, 0],
      [0.3, 0.3],
    ],
  };

  return (
    <>
      {dotPositions[value].map(([x, y], index) => (
        <div
          key={index}
          className='absolute top-[50%] left-[50%] h-5 w-5 rounded-[50%] bg-[#dfdad7]'
          style={{
            transform: `translate(-50%, -50%) translate(${x * 80}px, ${y * 80}px)`,
          }}
        />
      ))}
    </>
  );
};
