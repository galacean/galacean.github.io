import { keyframes, styled } from "@editor/design-system";

const contentFadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.8)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const contentFadeOut = keyframes({
  '0%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  '100%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.8)' },
})

export const contentStyle = styled(null, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "90vw",
  minWidth: '440px',
  maxWidth: '560px',
  maxHeight: "85vh",
  padding: '$5',
  paddingTop: '$6',
  borderRadius: '$2',
  boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 28px 23px -7px, rgb(0 0 0 / 4%) 0px 12px 12px -7px',
  backgroundColor: '$subbg',
  // animation: `${fadeIn} 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,

  "&:focus": { outline: "none" },

  '&[data-state=open]': {
    animation: `${contentFadeIn} 250ms ease`
  },
  '&[data-state=closed]': {
    animation: `${contentFadeOut} 250ms ease`
  },
});

const overlayFadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: .44 },
})

const overlayFadeOut = keyframes({
  '0%': { opacity: .44 },
  '100%': { opacity: 0 },
});

export const overlayStyle = styled(null, {
  position: "fixed",
  background: '#000',
  opacity: 0.44,
  inset: 0,
  '&[data-state=open]': {
    animation: `${overlayFadeIn} 250ms ease`
  },
  '&[data-state=closed]': {
    animation: `${overlayFadeOut} 250ms ease`
  },
});