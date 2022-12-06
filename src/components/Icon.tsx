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
   * Icon size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Icon width
   */
  width?: string | number;

  /**
   * Icon height
   */
  height?: string | number;

  /**
   * Icon fill color
   */
  fill?: string;

  /**
   * Icon content
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
  renderContainer?: (props: IconContainerProps<T>) => ReactNode;
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
export type IconContainerProps<T> = IconChildrenProps & Pick<BaseIconProps<T>, 'ref'>;

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
