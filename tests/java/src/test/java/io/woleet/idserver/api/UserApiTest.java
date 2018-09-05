/*
 * Woleet.ID Server
 * This is Woleet.ID Server API documentation.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: contact@woleet.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package io.woleet.idserver.api;

import io.woleet.idserver.ApiException;
import io.woleet.idserver.Config;
import io.woleet.idsever.api.model.User;
import io.woleet.idsever.api.model.UserArray;
import io.woleet.idsever.api.model.UserPut;
import io.woleet.idsever.api.model.UserStatusEnum;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.util.UUID;

import static org.junit.Assert.*;

/**
 * API tests for UserApi
 */
public class UserApiTest {

    private final UserApi api = new UserApi();

    @Before
    public void setUp() throws Exception {
        tearDown();
    }

    @After
    public void tearDown() throws Exception {
        Config.deleteAllTestUsers();
    }

    @Test
    public void createUserTest() throws ApiException {
        User user = Config.createTestUser();
        assertNotNull(user.getId());
        assertNotNull(user.getCreatedAt());
        assertTrue(user.getCreatedAt() <= user.getUpdatedAt());
        //assertNull(user.getLastLogin());
        //assertNull(user.getDeletedAt());
        assertNotNull(user.getDefaultKeyId());
        assertEquals(user.getStatus(), UserStatusEnum.ACTIVE);
        assertNull(user.getEmail());


    }

    @Test
    @Ignore
    public void deleteUserTest() throws ApiException {
        UUID userId = null;
        User response = api.deleteUser(userId);

        // TODO: test validations
    }

    @Test
    @Ignore
    public void getAllUsersTest() throws ApiException {
        UUID userId = null;
        Boolean full = null;
        UserArray response = api.getAllUsers(userId, full);

        // TODO: test validations
    }

    @Test
    @Ignore
    public void getUserByIdTest() throws ApiException {
        UUID userId = null;
        User response = api.getUserById(userId);

        // TODO: test validations
    }

    @Test
    @Ignore
    public void updateUserTest() throws ApiException {
        UUID userId = null;
        UserPut userPut = null;
        User response = api.updateUser(userId, userPut);

        // TODO: test validations
    }

}
