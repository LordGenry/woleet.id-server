package io.woleet.idserver.api;

import io.woleet.idserver.ApiException;
import io.woleet.idserver.api.model.UserInfo;
import org.junit.Ignore;
import org.junit.Test;

/**
 * TODO: API tests for AuthenticationApi
 */
@Ignore
public class AuthenticationApiTest {

    private final AuthenticationApi api = new AuthenticationApi();

    /**
     * Return information about the current logged user.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void getUserInfoTest() throws ApiException {
        UserInfo response = api.getUserInfo();

        // TODO: test validations
    }

    /**
     * Log into the system. Both email or username can be used to authentify.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void loginTest() throws ApiException {
        UserInfo response = api.login();

        // TODO: test validations
    }

    /**
     * Log out from the system.
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void logoutTest() throws ApiException {
        api.logout();

        // TODO: test validations
    }
}
