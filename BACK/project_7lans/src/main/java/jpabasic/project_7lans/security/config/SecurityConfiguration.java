package jpabasic.project_7lans.security.config;

import jpabasic.project_7lans.entity.MemberType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final CorsConfig corsConfig;
    private final AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // csrf 설정
                // Single Page Application 의 경우 기능을 사용하지 않아도 됨.
                .csrf(csrf -> csrf.disable())
                // 예외 설정
                 .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                // 세션 설정
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 인가 설정
                .authorizeHttpRequests(
                        (authorizeRequests) -> {
                            authorizeRequests.requestMatchers("/member/register").permitAll();
                            authorizeRequests.requestMatchers("/member/login").permitAll();
                            // hasRole는 SpringSecurity 가 자동으로 가장 앞에 Role_를 붙인다. 따라서 hasAuthority를 쓰는 것이 낫다.
                            // authorizeRequests.requestMatchers("/vol/**").hasRole(MemberType.VOLUNTEER.name());
                            authorizeRequests.requestMatchers("/vol/**").hasAuthority(MemberType.VOLUNTEER.name());
                            authorizeRequests.anyRequest().authenticated();
                        }
                );

        http.authenticationProvider(authenticationProvider);

        http.addFilter(corsConfig.corsFilter()); // cors 필터 적용
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
