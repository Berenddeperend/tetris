export type Animation = [Keyframe[], KeyframeAnimationOptions];

export default {
  fadeIn: [
    [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    {
      duration: 400,
      easing: "steps(4, end)",
    },
  ],

  fadeOut: [
    [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    {
      duration: 400,
      easing: "steps(4, end)"
    },
  ],
  
  boop: [
    [
      {
        transform: 'scale(1)'
      },
      {
        transform: 'scale(1.3)'
      },
      {
        transform: 'scale(1)'
      }
    ],

    {
      duration: 100,
      easing: "steps(3, end)",
    }
  ]
};
