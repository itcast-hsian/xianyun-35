// state 是仓库的数据
// mutations 同步修改state的数据
// actions 异步修改state的数据

// 用户管理
export const state = () => {
    return {
        userInfo: {
            token:"",
            user: {}
        }
    }
}

export const mutations = {
    // 设置用户信息,mutations下的方法第一个参数固定是state
    // data参数不是必须的，是调用方法时候传入的参数
    setUserInfo(state, data){
        // data是后台返回的用户信息
        state.userInfo = data;
    },

    // 清空userInfo 
    clearUserInfo(state){
        state.userInfo = {
            token:"",
            user: {}
        }
    }
};
