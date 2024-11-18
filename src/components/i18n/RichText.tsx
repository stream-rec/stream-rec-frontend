import {ReactNode} from 'react';

// These tags are available
type Tag = 'p' | 'b' | 'important' | 'code';

type Props = {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode
};

export default function RichText({children}: Props) {
  return (
      <div className="prose">
        {children({
          p: (chunks: ReactNode) => <p>{chunks}</p>,
          b: (chunks: ReactNode) => <b className="font-semibold">{chunks}</b>,
          // i: (chunks: ReactNode) => <i className="italic">{chunks}</i>,
          important: (chunks: ReactNode) => <><br/><b>{chunks}</b></>,
          code: (chunks: ReactNode) => <><br/><code>{chunks}</code></>
        })}
      </div>
  );
}