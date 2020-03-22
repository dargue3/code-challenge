import styled from 'styled-components';
import get from 'lodash/get';
import * as ss from 'styled-system';
import { lightModeTheme } from '../../styles/theme';

// These CSS attributes aren't supported by any styled-system API, but we can add them manually
ss.system({ prop: 'cursor', cssProperty: 'cursor' });
ss.system({ prop: 'textDecoration', cssProperty: 'textDecoration' });
ss.system({ prop: 'textTransform', cssProperty: 'textTransform' });
ss.system({ prop: 'whiteSpace', cssProperty: 'whiteSpace' });

export const styledProps = ss.compose(
  ss.color,
  ss.space,
  ss.layout,
  ss.position,
  ss.typography,
  ss.system({ textDecoration: true, textTransform: true, cursor: true, whiteSpace: true }),
);

// A developer can provide any number of 'typeface aliases' as props to Text.
// This logic looks them up in the theme file and then spreads their corresponding attributes.
export const Text = styled.span.attrs(({ theme, typeface, ...allOtherProps }) => {
  const propsGivenByTypefaces = get(lightModeTheme, `typefaces.${typeface}`, {});

  const stylingProps = { ...propsGivenByTypefaces, ...allOtherProps };
  if (typeof stylingProps.lineHeight === 'undefined') {
    stylingProps.lineHeight = stylingProps.fontSize;
  }

  return stylingProps;
})`
  ${styledProps};
`;
