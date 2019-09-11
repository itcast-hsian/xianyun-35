
export const state = () => {
    return {
        // 机票的信息的对象
        infoData: {
            seat_infos: {}
        },

        // 总价格
        allPrice: 0,
    }
}

export const mutations = {
    // 修改机票信息
    setInfoData(state, data){
        // 
        state.infoData = data;
    },

    // 修改总价格
    setAllPirce(state, price){
        state.allPrice = price
    }
}