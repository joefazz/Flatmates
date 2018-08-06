    // componentDidMount() {
    //     RNIap.getProducts(iapSKUs).then(res => this.setState({ productList: res.sort((item, next) => Number(item.price) - Number(next.price)) }));
    // }

    // displayIAP = async () => {
    //     this.setState({ isPurchaseModalAvaliable: true });
    // }

    // purchaseIAP = async (sku: string, amount: number) => {
    //     try {
    //         this.setState({ purchasingStatus: 'Loading Items', isPurchaseModalAvaliable: false, isPurchasingModalAvaliable: true });
    //         const purchase = await RNIap.buyProduct(sku);

    //         this.setState({ purchasingStatus: 'Verifying Purchase' });
    //         await RNIap.validateReceiptIos({ 'receipt-data': purchase.transactionReceipt }, true);

    //         await this.props.addApplications({ id: this.props.user.id, newAllowance: this.props.user.applicationAllowance + amount });

    //         this.setState({ isPurchasingModalAvaliable: false, purchasingStatus: '' });

    //         // await RNIap.consumePurchase(purchase.purchaseToken);
    //     } catch (err) {
    //         alert(err);
    //     }
    //     this.setState({ isPurchasingModalAvaliable: false, purchasingStatus: '' });
    // }

    // renderPaymentModal = () => {
    //     return (
    //         <Modal visible={this.state.isPurchaseModalAvaliable} animationType={'slide'} transparent={true}>
    //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: isIphoneX() ? toConstantHeight(15) : toConstantHeight(7) }}>
    //                 <TouchableOpacity style={{ backgroundColor: Colors.grey, paddingVertical: 10, borderRadius: 13, marginBottom: 20, shadowOffset: { width: 1, height: 2 }, shadowColor: Colors.black, shadowOpacity: 0.5, shadowRadius: 1, elevation: 4 }} onPress={() => this.setState({ isPurchaseModalAvaliable: false })}>
    //                     <Text style={{ width: toConstantWidth(90), textAlign: 'center', color: Colors.brandErrorColor, ...FontFactory({ weight: 'Bold' }), fontSize: 16 }}>Cancel Purchase</Text>
    //                 </TouchableOpacity>
    //                 <View style={{ height: toConstantHeight(30), width: toConstantWidth(90), alignItems: 'center', backgroundColor: Colors.reallyLight, shadowOffset: { width: 0, height: 0 }, shadowColor: Colors.grey, shadowOpacity: 1, shadowRadius: 5, elevation: 4, borderRadius: 13 }}>
    //                     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //                         <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 18, marginHorizontal: 30, textAlign: 'center', color: Colors.brandPrimaryColor }}>How many applications would you like to buy?</Text>
    //                     </View>
    //                     <View style={{ flexDirection: 'row', flex: 1, borderBottomRightRadius: 13, borderBottomLeftRadius: 13, backgroundColor: Colors.brandSecondaryColor }}>
    //                         {this.state.productList.map((product, index) => (
    //                             <TouchableHighlight
    //                                 key={product.productId}
    //                                 underlayColor={Colors.brandTertiaryColor}
    //                                 onPress={() => this.purchaseIAP(product.productId, product.title.includes('Five') ? 5 : product.title.includes('Fifteen') ? 15 : 10000)}
    //                                 style={{
    //                                     flex: 1,
    //                                     alignItems: 'center',
    //                                     justifyContent: 'center',
    //                                     borderRightWidth: index !== this.state.productList.length - 1 ? 1 : 0,
    //                                     borderColor: Colors.white,
    //                                     borderBottomLeftRadius: index === 0 ? 13 : 0,
    //                                     borderBottomRightRadius: index === this.state.productList.length - 1 ? 13 : 0
    //                                 }}>
    //                                 <Text style={{ ...FontFactory({ weight: 'Bold' }), fontSize: 18, color: Colors.white, textAlign: 'center' }}>{product.title.substring(0, product.title.indexOf(' '))} {product.title.includes('Infinite') ? '' : 'more'} {"\n"}for{"\n"}{product.localizedPrice}</Text>
    //                             </TouchableHighlight>
    //                         ))}
    //                     </View>
    //                 </View>
    //             </View>
    //         </Modal >

    //     );
    // }

    // renderLoadingModal = () => {
    //     return (
    //         <Modal animationType={'fade'} visible={this.state.isPurchasingModalAvaliable} transparent={true}>
    //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', shadowColor: Colors.black, shadowOpacity: 0.7, shadowOffset: { width: 2, height: 4 }, shadowRadius: 8, elevation: 4, borderRadius: 5, backgroundColor: Colors.brandPrimaryColor, width: toConstantWidth(60), height: toConstantHeight(20) }}>
    //                     <ActivityIndicator color={'white'} />
    //                     <Text style={{ ...FontFactory(), color: Colors.white, fontSize: 18 }}>{this.state.purchasingStatus}</Text>
    //                 </View>
    //             </View>
    //         </Modal>
    //     );
    // }