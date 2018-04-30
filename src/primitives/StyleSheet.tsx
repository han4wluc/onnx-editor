

export type StyleType = {
  display?: 'flex',
  flexDirection?: 'row',
  alignItems?: 'center',
  justifyContent?: 'center',
  width?: number,
  height?: number,
  borderRadius?: number,
  borderWidth?: number,
  borderStyle?: 'solid',
  borderColor?: string,
  backgroundColor?: string,
  padding?: number,
  color?: string,
  textDecoration?: 'underline',
  marginTop?: number,
}

export type StyleMap = { [s: string]: StyleType; }

const create : (x:StyleMap) => StyleMap = (x) => {
  return x;
}

export default {
  create
}
