import styled from 'styled-components';
import * as ss from 'styled-system';

const styledProps = ss.compose(
  ss.color,
  ss.space,
  ss.layout,
  ss.border,
  ss.shadow,
  ss.flexbox,
  ss.position,
  ss.background,
  ss.typography,
  ss.system({ cursor: true }),
  ss.system({ clipPath: true }),
  ss.system({ userSelect: true }),
  ss.system({ visibility: true }),
  ss.system({ pointerEvents: true }),
  ss.system({ backdropFilter: true }),
);

const Box = styled.div(styledProps);

const Flex = styled(Box)`
  display: flex;
  ${p => (p.column ? 'flex-direction: column' : '')};
`;

export { Flex, Box };
