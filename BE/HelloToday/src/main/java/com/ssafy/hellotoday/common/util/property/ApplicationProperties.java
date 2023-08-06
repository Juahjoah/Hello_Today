package com.ssafy.hellotoday.common.util.property;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApplicationProperties {

    public static String HOST_IMAGE_URL;
    public static String PROFILE_PATH;
    public static String ROUTINECHECK_PATH;

    public ApplicationProperties(@Value("${host.profile.url}") String hostImgUrl,
                                 @Value("${file.profile.path}") String profilePath,
                                 @Value("${file.routinecheck.path}") String routinePath) {
        HOST_IMAGE_URL = hostImgUrl;
        PROFILE_PATH = profilePath;
        ROUTINECHECK_PATH = routinePath;
    }
}
