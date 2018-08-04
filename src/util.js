export function getRedirectPath({ type, avatar }) {
  //根据用户信息返回要跳转到的地址
  //user.type :boss/condidate
  //user.avatar  : bossinfo/condidateiinfo
  let url = type === "boss" ? "/boss" : "/condidate";
  if (!avatar) {
    url += "info";
  }
  return url;
}
export function getChatId(userId,TargetId){
  return [userId,TargetId].sort().join("_")
}