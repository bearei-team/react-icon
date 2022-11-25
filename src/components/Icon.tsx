import {useId} from 'react';
import type {DetailedHTMLProps, HTMLAttributes, ReactNode, Ref} from 'react';
import type {ViewProps} from 'react-native';
import handleEvent from '@bearei/react-util/lib/event';
import type {HandleEvent} from '@bearei/react-util/lib/event';

/**
 * Base icon props
 */
export interface BaseIconProps<T>
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & ViewProps, 'ref'> {
  /**
   * Custom icon ref
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
  renderContainer?: (props: IconContainerProps<T>, element?: ReactNode) => ReactNode;
}

/**
 * Icon children props
 */
export interface IconChildrenProps<T>
  extends Omit<IconProps<T>, 'renderContainer' | 'renderMain' | 'ref'> {
  /**
   * Unique ID of icon component
   */
  id: string;

  /**
   * Used to handle some common default events
   */
  handleEvent: HandleEvent;
}

/**
 * Icon main props
 */
export type IconMainProps<T> = IconChildrenProps<T>;

/**
 * Icon container props
 */
export type IconContainerProps<T> = Pick<IconProps<T>, 'ref'> & IconChildrenProps<T>;

function Icon<T>({ref, renderMain, renderContainer, ...args}: IconProps<T>) {
  const id = useId();
  const childrenProps = {...args, id, handleEvent};
  const mainElement = <>{renderMain?.(childrenProps)}</>;
  const containerElement = (
    <>{renderContainer?.({...childrenProps, ref}, mainElement) ?? mainElement}</>
  );

  return <>{containerElement}</>;
}

export default Icon;
