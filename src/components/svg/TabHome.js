import * as React from "react";
import {View} from "react-native";
import Svg, {Path} from "react-native-svg";

export const TabHomeSvg = props => (
  <View>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}>
      <Path
        d="M15.8 7.806a.806.806 0 0 0-.063-1.127L8.587.216A.87.87 0 0 0 7.423.23L.249 7.023A.802.802 0 0 0 .214 8.15l.18.194c.299.32.781.359 1.077.085l.536-.496v7.262c0 .445.35.806.78.806h2.797c.431 0 .781-.36.781-.806v-5.08h3.567v5.08c-.006.445.303.806.733.806h2.964c.431 0 .781-.361.781-.806v-7.16l.33.3c.183.166.566.033.856-.297l.204-.23Z"
        fill="#fff"
      />
    </Svg>
  </View>
);

export const TabCourseSvg = props => (
  <View>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}>
      <Path
        d="M15.531 0H.47C.209 0 0 .251 0 .561v14.877c0 .31.21.562.469.562H15.53c.26 0 .469-.251.469-.562V.561c0-.31-.21-.561-.469-.561ZM5.05 13.9v.977H3.476V13.9h1.573Zm.937 0H7.56v.977H5.986V13.9Zm2.51 0h1.574v.977H8.497V13.9Zm2.511 0h1.573v.977h-1.573V13.9ZM.937 12.776V3.223h14.126v9.553H.937ZM11.008 2.1v-.978h1.573v.978h-1.573Zm-.937 0H8.497v-.978h1.573v.978Zm-2.51 0H5.985v-.978H7.56v.978Zm-2.511 0H3.476v-.978h1.573v.978Zm10.014 0h-1.545v-.978h1.544v.978ZM2.537 1.123v.978h-1.6v-.978h1.6Zm-1.6 12.776h1.6v.978h-1.6V13.9Zm12.58.978V13.9h1.544v.978h-1.544Z"
        fill="#fff"
      />
    </Svg>
  </View>
);

export const TabCartSvg = props => (
  <View>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}>
      <Path
        d="M.469 1.067h1.955l2.263 9.014-.178.403c-.467 1.063.211 2.316 1.258 2.316h7.89c.258 0 .468-.239.468-.533 0-.295-.21-.534-.469-.534H5.767c-.348 0-.576-.417-.42-.772l.13-.294h8.18c.208 0 .392-.158.45-.387l1.875-7.467a.594.594 0 0 0-.076-.468.453.453 0 0 0-.375-.212H3.666L3.228.387C3.17.157 2.986 0 2.777 0H.469C.209 0 0 .239 0 .533c0 .295.21.534.469.534Z"
        fill="#fff"
      />
    </Svg>
  </View>
);
