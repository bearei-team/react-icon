import type {DetailedHTMLProps, HTMLAttributes, ReactNode, Ref} from 'react';
import {useId} from 'react';
import type {ViewProps} from 'react-native';

/**
 * Base icon props
 */
export interface BaseIconProps<T = HTMLElement>
  extends Omit<DetailedHTMLProps<HTMLAttributes<T>, T> & ViewProps, ''> {
  /**
   * Custom ref
   */
  ref?: Ref<T>;

  /**
   * Set the icon size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Set the width of the icon
   */
  width?: string | number;

  /**
   * Set the icon height
   */
  height?: string | number;

  /**
   * Set the icon fill color
   */
  fill?: string;

  /**
   * The main area content of the icon
   */
  content?: ReactNode;
}

/**
 * Icon props
 */
export interface IconProps<T> extends BaseIconProps<T> {
  /**
   * Render the icon main
   */
  renderMain?: (props: IconMainProps) => ReactNode;

  /**
   * Render the icon container
   */
  renderContainer?: (props: IconContainerProps) => ReactNode;
}

/**
 * Icon children props
 */
export interface IconChildrenProps extends Omit<BaseIconProps, 'ref'> {
  /**
   * Component unique ID
   */
  id: string;
  children?: ReactNode;
}

export type IconMainProps = IconChildrenProps;
export type IconContainerProps = IconChildrenProps & Pick<BaseIconProps, 'ref'>;

const Icon = <T extends HTMLElement>({
  ref,
  renderMain,
  renderContainer,
  ...props
}: IconProps<T>) => {
  const id = useId();
  const childrenProps = {...props, id};
  const main = renderMain?.(childrenProps);
  const content = <>{main}</>;
  const container = renderContainer?.({...childrenProps, children: content, ref});

  return <>{container}</>;
};

export default Icon;
