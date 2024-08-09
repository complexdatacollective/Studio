import * as DialogPrimitive from '@radix-ui/react-dialog';

const Dialog = ({
  content,
  children,
  isOpen,
  onOpenChange,
  title,
}: {
  content: React.ReactNode;
  children?: React.ReactNode;
  isOpen?: boolean;
  title?: string;
  onOpenChange?: (open: boolean) => void;
}) => {
  return (
    <DialogPrimitive.Root defaultOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-50 bg-cyber-grape-dark opacity-75" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <DialogPrimitive.Title className="text-mauve12 m-0 text-[17px] font-medium">
            {title}
          </DialogPrimitive.Title>
          {content}
          <DialogPrimitive.Close asChild>
            <button
              className="hover:bg-violet4 absolute top-2 inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full text-cyber-grape outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-blue ltr:right-2 rtl:left-2"
              aria-label="Close"
            >
              X
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
