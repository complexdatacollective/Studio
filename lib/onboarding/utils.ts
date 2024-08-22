export const getTargetElement = (dataId: string): HTMLElement | null => {
  return document.querySelector(`[data-id="${dataId}"]`);
};

export const getElementPosition = (targetElementId: string) => {
  const element = document.getElementById(targetElementId);
  if (!element) {
    return null;
  }
  const { top, left, height, width } = element.getBoundingClientRect();
  return { top, left, height, width };
};
