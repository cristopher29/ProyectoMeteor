/**
 * Created by CristoH on 30/05/2016.
 */

Accounts.onCreateUser(function(options, user) {

    user.postsCount = 0;
    user.followersCount = 0;
    user.followingCount = 0;

    return user;
});