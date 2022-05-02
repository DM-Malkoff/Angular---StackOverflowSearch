import {animate, group, query, state, style, transition, trigger} from "@angular/animations";


export const searchFormMove = trigger('searchBlock', [
    state('start', style({
      position: 'fixed',
      top: '50%',
      width: '100%',
      marginTop: '-70px',
      transform: 'translateX(0)'
    })),
    state('end', style({
      position: 'static',
      top: '0%',
      width: '100%'
    })),
    transition('start => end', [
      style({
        position: 'fixed',
        top: '20%',
        width: '100%',
        marginTop: '0px'
      }),
      animate(500)
    ]),
    transition('void => start', [
      style({
        position: 'fixed',
        top: '50%',
        transform: 'translateX(100%)',
        marginTop: '-70px'
      }),
      animate(500)
    ]),
  ]
)

export const authAnimate = trigger('authForm', [
  transition('* <=> void', [

  ]),
  transition('* <=> *', [
    query(":enter, :leave", style({
      position: 'absolute',
      width: '100%',
      // left: 50%;
    }), {
      optional: true,
    }),
    group([
      query(
        ":enter",
        [
          style({
            transform: 'translate(100%)',
          }),
          animate("0.5s ease-in-out", style({
            transform: 'translate(0%)',
          }))
        ],
        {optional: true}
      ),
      query(
        ":leave", [
          style({
            transform: 'translate(0%)',
          }),
          animate("0.5s ease-in-out", style({
            transform: 'translate(-100%)',
          }))
        ],
        {optional: true}
      )
    ])
  ]),

])

export const showTable = trigger('showTable', [
    state('start', style({
      opacity: 0
    })),
    state('end', style({
      opacity: 1
    })),
    transition('start => end', animate(4000))
  ]
)
