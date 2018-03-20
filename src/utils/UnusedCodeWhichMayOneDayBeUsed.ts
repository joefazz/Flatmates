/* CODE WHICH ANIMATES AN EXPANDABLE FILTER, MADE FOR POST LIST DISCARDED */

// private _animationValue: Animated.Value = new Animated.Value(0);
// private _ANIMATION_DURATION_CONSTANT: number = 500;

// private heightAnimation = {
//     height: this._animationValue.interpolate({
//         inputRange: [0, 1],
//         outputRange: [toConstantHeight(10.5), toConstantHeight(22)]
//     })
// };

// private shrinkGrowAnimation = {
//     width: this._animationValue.interpolate({
//         inputRange: [0, 1],
//         outputRange: [toConstantWidth(27), toConstantWidth(90)]
//     }),
//     // backgroundColor: 'red'
// }

// private opacityAnimation = {
//     opacity: this._animationValue.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 1]
//     })
// };

// private rotateAnimation = {
//     transform: [
//         {
//             rotate: this._animationValue.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['0deg', '180deg']
//             })
//         }
//     ]
// }

{
    /*<TouchableOpacity onPress={this.animateFilter} activeOpacity={0.7} style={ feed.expandBar }>
                        <Animated.View style={this.rotateAnimation}>
                            <Icon name={'ios-arrow-up'} size={toConstantFontSize(3)} style={{color: Colors.highlightWhite}} />
                        </Animated.View>
                    </TouchableOpacity>*/
}

// private animateFilter = () => {
//     if (this.state.isFilterOpen) {
//         Animated.timing(this._animationValue, {
//             toValue: 0,
//             duration: this._ANIMATION_DURATION_CONSTANT,
//             easing: Easing.elastic(0.7)
//         }).start(() => this.setState({ isFilterOpen: false }));
//     } else {
//         Animated.timing(this._animationValue, {
//             toValue: 1,
//             duration: this._ANIMATION_DURATION_CONSTANT,
//             easing: Easing.elastic(1)
//         }).start(() => this.setState({ isFilterOpen: true }));
//     }
// }

/* ---------------------------------------------- */
