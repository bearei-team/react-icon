import type {HandleEvent} from '@bearei/react-util/lib/event';
import handleEvent from '@bearei/react-util/lib/event';
import type {DetailedHTMLProps, HTMLAttributes, ReactNode, Ref} from 'react';
import {useId} from 'react';
import type {ViewProps} from 'react-native';

/**
 * Base icon props
 */
export interface BaseIconProps<T>
  extends Omit<DetailedHTMLProps<HTMLAttributes<T>, T> & ViewProps, ''> {
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
  renderMain?: (props: IconMainProps<T>) => ReactNode;

  /**
   * Render the icon container
   */
  renderContainer?: (props: IconContainerProps<T>) => ReactNode;
}

/**
 * Icon children props
 */
export interface IconChildrenProps<T>
  extends Omit<IconProps<T>, 'renderContainer' | 'renderMain' | 'ref'> {
  /**
   * The unique ID of the component
   */
  id: string;
  children?: ReactNode;

  /**
   * Used to handle some common default events
   */
  handleEvent: HandleEvent;
}

export type IconMainProps<T> = IconChildrenProps<T>;
export type IconContainerProps<T> = Pick<IconProps<T>, 'ref'> & IconChildrenProps<T>;

function Icon<T>({ref, renderMain, renderContainer, ...props}: IconProps<T>) {
  const id = useId();
  const childrenProps = {...props, id, handleEvent};
  const main = renderMain?.(childrenProps);
  const container = renderContainer?.({...childrenProps, children: main, ref}) ?? main;

  return <>{container}</>;
}

export default Icon;
