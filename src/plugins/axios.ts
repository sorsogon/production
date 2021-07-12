/* eslint-disable */

import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import Vue, { PluginObject } from 'vue';

export default new class implements PluginObject<AxiosRequestConfig> {
  public service!: AxiosInstance;

  private addInterceptors(): void {
    
    interface ErrorResponse {
      message?: string,
      errors?: Array<_object>,
      status?: number,
      statusText?: string
    }

    this.service.interceptors.response.use(response => {
      const $store = require('@/store').default;
      $store.commit('progressBar/toggle');

      return response;
    }, error => {
      const $store = require('@/store').default;
      const _err: ErrorResponse = {};

      if (!error.response) {
        const { message } = error.toJSON();

        _err.message = message;
        _err.errors = [];
        _err.status = 0;
        _err.statusText = 'NetworkConnectivityError';

        $store.commit('snackBar/toggle', {
          message,
          color: 'red accent-2',
          toggle: true
        });
        
      } else {
        const { status, statusText, data: { errors, message } } = error.response;

        if (status === 419 || status === 401) {
          localStorage.clear();
          location.reload();
        }

        _err.message = message;
        _err.errors = errors;
        _err.status = status;
        _err.statusText = statusText;
      }

      $store.commit('progressBar/toggle');

      return Promise.reject(_err);
    });

    this.service.interceptors.request.use(request => {
      const $store = require('@/store').default;
      $store.commit('progressBar/toggle');

      return request;
    });
  }

  public install(_Vue: typeof Vue, options?: AxiosRequestConfig) {
    this.service = axios.create(options);
    this.addInterceptors();
    _Vue.prototype.$axios = this.service;
  }
}