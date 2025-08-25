"use client"

import React, { createContext, useCallback, useContext, useEffect } from "react"
import { createPortal } from "react-dom"
import { X as XIcon } from "lucide-react"
import { cn } from "../../lib/utils"

type DialogContextType = {
  open: boolean
  setOpen: (v: boolean) => void
}

const DialogCtx = createContext<DialogContextType | null>(null)

type DialogRootProps = {
  open: boolean
  onOpenChange?: (v: boolean) => void
  children: React.ReactNode
}

function Dialog({ open, onOpenChange, children }: DialogRootProps) {
  const setOpen = useCallback((v: boolean) => onOpenChange?.(v), [onOpenChange])
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [open])
  return <DialogCtx.Provider value={{ open, setOpen }}>{children}</DialogCtx.Provider>
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") return null
  return createPortal(<>{children}</>, document.body)
}

function DialogOverlay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  )
}

function DialogClose({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(DialogCtx)!
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(false)}
      className={cn(
        "absolute top-4 right-4 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 focus:outline-none",
        className
      )}
      {...props}
    >
      {children ?? <XIcon className="h-4 w-4" />}
      <span className="sr-only">Fechar</span>
    </button>
  )
}

type DialogContentProps = React.HTMLAttributes<HTMLDivElement> & { showCloseButton?: boolean }

function DialogContent({ className, children, showCloseButton = true, ...props }: DialogContentProps) {
  const ctx = useContext(DialogCtx)!
  if (!ctx.open) return null

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") ctx.setOpen(false)
  }

  return (
    <DialogPortal>
      <DialogOverlay onClick={() => ctx.setOpen(false)} />
      <div
        role="dialog"
        aria-modal="true"
        onKeyDown={onKeyDown}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          data-slot="dialog-content"
          className={cn(
            "relative w-full max-w-3xl sm:max-w-4xl md:max-w-5xl rounded-xl bg-white p-6 shadow-2xl border",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && <DialogClose />}
        </div>
      </div>
    </DialogPortal>
  )}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-header" className={cn("flex flex-col gap-2", className)} {...props} />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-footer" className={cn("flex justify-end gap-2", className)} {...props} />
  )
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 data-slot="dialog-title" className={cn("text-xl font-semibold", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="dialog-description" className={cn("text-sm text-gray-600", className)} {...props} />
}

type TriggerChildProps = { onClick?: React.MouseEventHandler }

function DialogTrigger({ children }: { children: React.ReactElement<TriggerChildProps> }) {
  const ctx = useContext(DialogCtx)!
  const mergedOnClick: React.MouseEventHandler = (e) => {
    children.props.onClick?.(e)
    ctx.setOpen(true)
  }
  return React.cloneElement(children, { onClick: mergedOnClick })
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
